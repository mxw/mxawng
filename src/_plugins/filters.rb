#
# filters.rb - utility filters for Liquid
#
# the `truncate`, `condense_spaces`, and `raw_content` filters are adapted from
# https://github.com/imathis/octopress/blob/master/plugins/octopress_filters.rb
#

module Jekyll
  module UtilityFilters
    BEGIN_EXCERPT = /<!--\s*begin-excerpt\s*-->/i
    END_EXCERPT = /<!--\s*end-excerpt\s*-->/i

    # concatenate two arrays
    def merge(input, other)
      (input || []) + (other || [])
    end

    # test for custom post excerpt delimiters
    def has_excerpt(input)
      input =~ BEGIN_EXCERPT && input =~ END_EXCERPT
    end

    # concatenate all excerpted sections together
    def excerpt(input)
      return input unless has_excerpt input
      out, rest = '', input

      while has_excerpt rest
        parts = rest.split(BEGIN_EXCERPT, 2)[1].split(END_EXCERPT, 2)
        out += parts[0]
        rest = parts[1]
      end
      out
    end

    # truncate by # of sentences rather than # of characters
    def truncate_sentences(input, num)
      (input.match(/(?:.*?(\.|!|\?)\s*){1,#{num}}/) || [input])[0].strip
    end

    # replace all extents of whitespace with ' '
    def condense_spaces(input)
      input.gsub(/\n/, ' ').gsub(/\s{2,}/, ' ')
    end

    # add `num` spaces in front of every line in `input`
    def indent(input, num)
      input.gsub(/^/, ' ' * num)
    end

    def raw_content(input)
      /<section class="\w*-content">(?<raw>.*?)<\/section>\s*<(footer|\/article)>/m =~ input
      return (raw.nil?) ? input : strip_headings(raw)
    end

    def strip_headings(input)
      input.gsub(/<h(\d)[^>]*>.*?<\/h\1>/m, '')
    end

=begin
    # truncate `input` to `length` characters, dropping an ellipsis at the end
    # if truncation occurred.
    #
    # this functionality has been upstreamed into liquid.
    def truncate(input, length)
      if input.length > length && input[0..(length-1)] =~ /(.+)\b.+$/im
        $1.strip + ' &hellip;'
      else
        input
      end
    end
=end
  end
end

Liquid::Template.register_filter(Jekyll::UtilityFilters)
