class Activity < ActiveRecord::Base
  belongs_to :difficulty
  belongs_to :event
  belongs_to :classroom
  belongs_to :activity_type
  belongs_to :activity_subtype
  has_many :teachers, dependent: :destroy
  has_many :users, through: :teachers

  validates  :event, :title, :difficulty, :activity_type, :activity_subtype, :duration, presence: true

  def end_time
    if(self.start_time)
      return self.start_time + (self.duration * 60)
    else
      return nil
    end
  end
end
