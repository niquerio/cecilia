class CreatePages < ActiveRecord::Migration
  def change
    create_table :pages do |t|
      t.string :title
      t.text :body, :limit => 4294967295

      t.timestamps null: false
    end
  end
end
