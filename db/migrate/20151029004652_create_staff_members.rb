class CreateStaffMembers < ActiveRecord::Migration
  def change
    create_table :staff_members do |t|
      t.references :event, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true
      t.references :staff_role, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
