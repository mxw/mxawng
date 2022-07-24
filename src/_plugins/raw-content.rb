#
# raw-content.rb - attach pre-rendered content to posts
#
# source: https://stackoverflow.com/questions/13159286/how-can-i-access-un-rendered-markdown-content-in-jekyll-with-liquid-tags
#

module RawContent
  class Generator < Jekyll::Generator
    def generate(site)
      site.posts.docs.each do |post|
        post.data['raw_content'] = post.content
      end
      site.collections['externals'].docs.each do |post|
        post.data['raw_content'] = post.content
      end
    end
  end
end
