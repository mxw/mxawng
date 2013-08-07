#
# filters.rb - Utility filters for Liquid.
#

module Jekyll
  module MergeFilter
    def merge(input, other)
      (input || []) + (other || [])
    end
  end
end

Liquid::Template.register_filter(Jekyll::MergeFilter)
