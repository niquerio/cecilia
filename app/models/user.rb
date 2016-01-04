class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, 
         :rememberable, :trackable

  belongs_to :title
  has_many :teachers
  has_many :activities, through: :teachers
  validates :username, :title, :sca_first_name, :sca_last_name, :email, :password, presence: true
end
