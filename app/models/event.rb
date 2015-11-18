class Event < ActiveRecord::Base
  validates :title, :start_date, :end_date, :presence => true
end
