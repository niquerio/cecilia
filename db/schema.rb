# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151028235655) do

  create_table "activities", force: :cascade do |t|
    t.string   "title"
    t.integer  "difficulty_id"
    t.text     "description"
    t.integer  "category_id"
    t.integer  "event_id"
    t.datetime "start_time"
    t.datetime "end_time"
    t.integer  "classroom_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "activities", ["category_id"], name: "index_activities_on_category_id"
  add_index "activities", ["classroom_id"], name: "index_activities_on_classroom_id"
  add_index "activities", ["difficulty_id"], name: "index_activities_on_difficulty_id"
  add_index "activities", ["event_id"], name: "index_activities_on_event_id"

  create_table "categories", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "classrooms", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.integer  "event_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "classrooms", ["event_id"], name: "index_classrooms_on_event_id"

  create_table "difficulties", force: :cascade do |t|
    t.integer  "level"
    t.string   "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "events", force: :cascade do |t|
    t.datetime "start_date"
    t.datetime "end_date"
    t.string   "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pages", force: :cascade do |t|
    t.string   "title"
    t.text     "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "event_id"
  end

  add_index "pages", ["event_id"], name: "index_pages_on_event_id"

end
