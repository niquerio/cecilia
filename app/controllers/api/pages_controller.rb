module Api
  class PagesController < ApplicationController
    def show
      @page = Page.find_by(stub: params[:stub], event_id: params[:event_id])  
    end
  end
end
