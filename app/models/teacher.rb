class Teacher < ActiveRecord::Base
  belongs_to :user
  belongs_to :activity
  has_one :event, through: :activity

  validates :user, presence: true
  validates :activity, presence: true
end
