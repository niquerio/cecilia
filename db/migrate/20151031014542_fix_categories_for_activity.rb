class FixCategoriesForActivity < ActiveRecord::Migration
  def change
    add_reference :activities, :activity_type, index:true, foreign_key: true
    add_reference :activities, :activity_subtype, index: true, foreign_key: true
  end
end
