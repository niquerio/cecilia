class CreateActivitySubtypes < ActiveRecord::Migration
  def change
    create_table :activity_subtypes do |t|
      t.string :name
      t.string :description

      t.timestamps null: false
    end
  end
end
