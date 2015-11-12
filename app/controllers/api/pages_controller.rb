module Api
  class PagesController < ApplicationController
    def show
      @page = Page.find_by(slug: params[:slug], event_id: params[:event_id])  
    end
  end
end
