require "rails_helper"

RSpec.describe Teacher, "validations" do
  it { is_expected.to validate_presence_of(:user) }
  it { is_expected.to validate_presence_of(:activity) }
end
