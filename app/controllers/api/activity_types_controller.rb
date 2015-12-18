module Api
  class ActivityTypesController < ApplicationController
    def index
      @activity_types = ActivityType.all
    end
  end
end
