class AddDetailsToUser < ActiveRecord::Migration
  def change
    add_column :users, :nickname, :string
    add_column :users, :bio, :text
  end
end