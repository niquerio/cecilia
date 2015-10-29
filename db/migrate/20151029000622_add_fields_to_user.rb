class AddFieldsToUser < ActiveRecord::Migration
  def change
    add_column :users, :modern_first_name, :string
    add_column :users, :modern_last_name, :string
    add_column :users, :sca_first_name, :string
    add_column :users, :sca_last_name, :string
    add_column :users, :username, :string
  end
end
