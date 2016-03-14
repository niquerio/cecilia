source 'https://rubygems.org'
ruby "2.3.0"

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.5'
gem 'mysql2'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

gem 'devise'
gem 'acts_as_tree'
gem 'backbone-on-rails'
gem 'ejs'
gem 'backbone-support'
gem "json2-rails"
gem 'marionette-rails'
gem 'bootstrap-sass'
gem 'momentjs-rails'
gem 'fontello_rails_converter'
gem 'select2-rails'
gem "font-awesome-rails"
gem "bootstrap-social-rails"
source 'https://rails-assets.org' do
  gem 'rails-assets-simplemde'
  gem 'rails-assets-marked'
  gem 'rails-assets-datatables'
  gem 'rails-assets-spin'
end

gem 'i18n'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment

gem 'puma'
group :development do
  gem "web-console", "~> 2.0"
end
group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'capistrano-rails'
  gem 'capistrano3-puma'
  gem 'capistrano-rbenv'
  gem 'byebug'
  gem "factory_girl_rails"
  gem "rspec-rails"
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem "spring"
  # Access an IRB console on exception pages or by using <%= console %> in views

  gem "teaspoon-mocha"
  gem "phantomjs"
  gem "pry-rails"
end

group :test do
  gem "database_cleaner"
  gem "shoulda-matchers"
  gem "json-schema"
  gem 'simplecov', :require => false
end

