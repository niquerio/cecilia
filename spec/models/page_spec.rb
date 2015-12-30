require "rails_helper"

RSpec.describe Page, "validations" do
  it { is_expected.to validate_presence_of(:event) }
  it { is_expected.to validate_presence_of(:slug) }
  
end
