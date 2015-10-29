class AddTitleToUsers < ActiveRecord::Migration
  def change
    add_reference :users, :title, index: true, foreign_key: true
  end
end
