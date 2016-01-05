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

ActiveRecord::Schema.define(version: 20160103013309) do

  create_table "activities", force: :cascade do |t|
    t.string   "title",               limit: 255
    t.integer  "difficulty_id",       limit: 4
    t.text     "description",         limit: 65535
    t.integer  "event_id",            limit: 4
    t.datetime "start_time"
    t.integer  "classroom_id",        limit: 4
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
    t.integer  "activity_type_id",    limit: 4
    t.integer  "activity_subtype_id", limit: 4
    t.integer  "duration",            limit: 4
  end

  add_index "activities", ["activity_subtype_id"], name: "index_activities_on_activity_subtype_id", using: :btree
  add_index "activities", ["activity_type_id"], name: "index_activities_on_activity_type_id", using: :btree
  add_index "activities", ["classroom_id"], name: "index_activities_on_classroom_id", using: :btree
  add_index "activities", ["difficulty_id"], name: "index_activities_on_difficulty_id", using: :btree
  add_index "activities", ["event_id"], name: "index_activities_on_event_id", using: :btree

  create_table "activity_subtypes", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.string   "description", limit: 255
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "activity_types", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.string   "description", limit: 255
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "classrooms", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.string   "description", limit: 255
    t.integer  "event_id",    limit: 4
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "classrooms", ["event_id"], name: "index_classrooms_on_event_id", using: :btree

  create_table "difficulties", force: :cascade do |t|
    t.integer  "level",       limit: 4
    t.string   "description", limit: 255
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "events", force: :cascade do |t|
    t.datetime "start_date"
    t.datetime "end_date"
    t.string   "title",      limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "menu_items", force: :cascade do |t|
    t.integer  "parent_id",  limit: 4
    t.string   "name",       limit: 255
    t.string   "url",        limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "pages", force: :cascade do |t|
    t.string   "title",      limit: 255
    t.text     "body",       limit: 4294967295
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.integer  "event_id",   limit: 4
    t.string   "slug",       limit: 255
  end

  add_index "pages", ["event_id"], name: "index_pages_on_event_id", using: :btree

  create_table "staff_members", force: :cascade do |t|
    t.integer  "event_id",      limit: 4
    t.integer  "user_id",       limit: 4
    t.integer  "staff_role_id", limit: 4
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "staff_members", ["event_id"], name: "index_staff_members_on_event_id", using: :btree
  add_index "staff_members", ["staff_role_id"], name: "index_staff_members_on_staff_role_id", using: :btree
  add_index "staff_members", ["user_id"], name: "index_staff_members_on_user_id", using: :btree

  create_table "staff_roles", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.string   "description", limit: 255
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "teachers", force: :cascade do |t|
    t.integer  "user_id",     limit: 4
    t.integer  "activity_id", limit: 4
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

  add_index "teachers", ["activity_id"], name: "index_teachers_on_activity_id", using: :btree
  add_index "teachers", ["user_id"], name: "index_teachers_on_user_id", using: :btree

  create_table "titles", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  limit: 255,   default: "", null: false
    t.string   "encrypted_password",     limit: 255,   default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,     default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.datetime "created_at",                                        null: false
    t.datetime "updated_at",                                        null: false
    t.string   "modern_first_name",      limit: 255
    t.string   "modern_last_name",       limit: 255
    t.string   "sca_first_name",         limit: 255
    t.string   "sca_last_name",          limit: 255
    t.string   "username",               limit: 255
    t.integer  "title_id",               limit: 4
    t.string   "nickname",               limit: 255
    t.text     "bio",                    limit: 65535
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["title_id"], name: "index_users_on_title_id", using: :btree

  add_foreign_key "activities", "activity_subtypes"
  add_foreign_key "activities", "activity_types"
  add_foreign_key "activities", "classrooms"
  add_foreign_key "activities", "difficulties"
  add_foreign_key "activities", "events"
  add_foreign_key "classrooms", "events"
  add_foreign_key "pages", "events"
  add_foreign_key "staff_members", "events"
  add_foreign_key "staff_members", "staff_roles"
  add_foreign_key "staff_members", "users"
  add_foreign_key "teachers", "activities"
  add_foreign_key "teachers", "users"
  add_foreign_key "users", "titles"
end
