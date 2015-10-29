class CreateStaffRoles < ActiveRecord::Migration
  def change
    create_table :staff_roles do |t|
      t.string :name
      t.string :description

      t.timestamps null: false
    end
  end
end
