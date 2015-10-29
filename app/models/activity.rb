class Activity < ActiveRecord::Base
  belongs_to :difficulty
  belongs_to :category
  belongs_to :event
  belongs_to :classroom
end
