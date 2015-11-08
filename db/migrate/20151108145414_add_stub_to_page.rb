class AddStubToPage < ActiveRecord::Migration
  def change
    add_column :pages, :stub, :string
  end
end
