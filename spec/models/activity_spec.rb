require "rails_helper"

RSpec.describe Activity, "validations" do
  it { is_expected.to validate_presence_of(:title) }
end
