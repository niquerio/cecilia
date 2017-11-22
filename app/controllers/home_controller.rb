class HomeController < ApplicationController
  skip_before_filter :authenticate_user!
  def index
    @event = Event.last
  end
end
