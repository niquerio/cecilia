module Api
  class TeachersController < ApplicationController
    def index
      @event = Event.find(params[:event_id])
      @users = User.joins(:activities).where(activities: { event_id: params[:event_id] }).distinct.order(:sca_first_name, :sca_last_name) 
      
    end
  end
end
