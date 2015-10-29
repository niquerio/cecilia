class StaffMember < ActiveRecord::Base
  belongs_to :event
  belongs_to :user
  belongs_to :staff_role
end
