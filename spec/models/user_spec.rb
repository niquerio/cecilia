require "rails_helper"

RSpec.describe User, "validations" do
  it { is_expected.to validate_presence_of(:email) }
  it { is_expected.to validate_presence_of(:password) }
  it { is_expected.to validate_presence_of(:username) }
  it { is_expected.to validate_presence_of(:title) }
  it { is_expected.to validate_presence_of(:sca_first_name) }
  it { is_expected.to validate_presence_of(:sca_last_name) }
    
  
end
