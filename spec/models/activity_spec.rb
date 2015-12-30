require "rails_helper"

RSpec.describe Activity, "validations" do
  it { is_expected.to validate_presence_of(:title) }
  it { is_expected.to validate_presence_of(:activity_type) }
  it { is_expected.to validate_presence_of(:activity_subtype) }
  it { is_expected.to validate_presence_of(:difficulty) }
  it { is_expected.to validate_presence_of(:event) }
end
