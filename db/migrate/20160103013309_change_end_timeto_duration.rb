class ChangeEndTimetoDuration < ActiveRecord::Migration
  def change
    add_column :activities, :duration, :integer
    remove_column :activities, :end_time, :datetime
  end
end
