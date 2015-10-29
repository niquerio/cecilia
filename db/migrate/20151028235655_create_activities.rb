class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.string :title
      t.references :difficulty, index: true, foreign_key: true
      t.text :description
      t.references :category, index: true, foreign_key: true
      t.references :event, index: true, foreign_key: true
      t.datetime :start_time
      t.datetime :end_time
      t.references :classroom, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
