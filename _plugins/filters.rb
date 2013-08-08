#
# filters.rb - Utility filters for Liquid.
#
# The `truncate`, `condense_spaces`, and `raw_content` filters are adapted from
# https://github.com/imathis/octopress/blob/master/plugins/octopress_filters.rb.
#

module Jekyll
  module UtilityFilters
    def merge(input, other)
      (input || []) + (other || [])
    end

    def truncate(input, length)
      if input.length > length && input[0..(length-1)] =~ /(.+)\b.+$/im
        $1.strip + ' &hellip;'
      else
        input
      end
    end

    def truncate_sentences(input, num)
      input.match(/(?:.*?(\.|!|\?)\s*){1,#{num}}/)[0].strip
    end

    def condense_spaces(input)
      input.gsub(/\s{2,}/, ' ')
    end

    def raw_content(input)
      /<div class="\w*-content">(?<raw>.*?)<\/div>\s*<(footer|\/article)>/m =~ input
      return (raw.nil?) ? input : strip_headings(raw)
    end

    def strip_headings(input)
      input.gsub(/<h(\d)[^>]*>.*?<\/h\1>/m, '')
    end
  end
end

Liquid::Template.register_filter(Jekyll::UtilityFilters)
