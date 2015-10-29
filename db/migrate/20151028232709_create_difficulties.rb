class CreateDifficulties < ActiveRecord::Migration
  def change
    create_table :difficulties do |t|
      t.integer :level
      t.string :description

      t.timestamps null: false
    end
  end
end
