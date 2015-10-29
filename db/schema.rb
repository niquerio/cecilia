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

ActiveRecord::Schema.define(version: 20151029004652) do

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

  create_table "staff_members", force: :cascade do |t|
    t.integer  "event_id"
    t.integer  "user_id"
    t.integer  "staff_role_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "staff_members", ["event_id"], name: "index_staff_members_on_event_id"
  add_index "staff_members", ["staff_role_id"], name: "index_staff_members_on_staff_role_id"
  add_index "staff_members", ["user_id"], name: "index_staff_members_on_user_id"

  create_table "staff_roles", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "titles", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "modern_first_name"
    t.string   "modern_last_name"
    t.string   "sca_first_name"
    t.string   "sca_last_name"
    t.string   "username"
    t.integer  "title_id"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  add_index "users", ["title_id"], name: "index_users_on_title_id"

end
