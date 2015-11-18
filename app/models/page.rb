class Page < ActiveRecord::Base
  validates :slug, presence: true
end
