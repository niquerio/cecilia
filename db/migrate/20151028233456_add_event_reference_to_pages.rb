class AddEventReferenceToPages < ActiveRecord::Migration
  def change
    add_reference :pages, :event, index: true, foreign_key: true
  end
end
