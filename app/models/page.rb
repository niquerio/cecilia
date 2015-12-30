class Page < ActiveRecord::Base
  belongs_to :event

  validates :event, presence: true
  validates :slug, presence: true
end
