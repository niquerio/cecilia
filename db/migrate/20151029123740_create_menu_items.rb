class CreateMenuItems < ActiveRecord::Migration
  def change
    create_table :menu_items do |t|
      t.integer :parent_id
      t.string :name
      t.string :url

      t.timestamps null: false
    end
  end
end
