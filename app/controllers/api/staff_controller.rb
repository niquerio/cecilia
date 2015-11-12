module Api
  class StaffController < ApplicationController
    def index
      @staff = StaffMember.where(event_id: params[:event_id])  
    end
  end
end
