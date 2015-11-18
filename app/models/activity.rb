class Activity < ActiveRecord::Base
  belongs_to :difficulty
  belongs_to :category
  belongs_to :event
  belongs_to :classroom
  belongs_to :activity_type
  belongs_to :activity_subtype
  has_many :teachers
  has_many :users, through: :teachers

  validates :title, presence: true
end
