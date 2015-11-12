class ChangeStubToSlug < ActiveRecord::Migration
  def change
    rename_column :pages, :stub, :slug
  end
end
