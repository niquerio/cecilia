module Api
  class ActivitySubtypesController < ApplicationController
    def index
      @activity_subtypes = ActivitySubtype.all
    end
  end
end
