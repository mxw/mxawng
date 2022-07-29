#
# copy-root.rb - copy _root into site root
#
# source: https://gist.github.com/DakuTree/0e0b0314c537766d18aef553a297ac9d
#

require 'fileutils'

module Jekyll
  module CopyRoot
    Jekyll::Hooks.register :site, :post_write do |site|
      root_dir = File.join site.source, site.config['root_dir'] || '_root'

      Dir.each_child root_dir do |filename|
        src_path = File.join root_dir, filename
        dst_path = File.join site.config['destination'], filename

        if File.file? src_path
          FileUtils.cp src_path, dst_path, :preserve => true
        else
          FileUtils.cp_r(
            src_path, dst_path,
            :preserve => true,
            :remove_destination => true
          )
        end
      end
    end
  end
end
