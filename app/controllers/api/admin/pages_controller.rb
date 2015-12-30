module Api
  module Admin
    class PagesController < ApplicationController
      before_action :authenticate_user!
      def index
        @pages = Page.where(event_id: params[:event_id])  
      end
      def show
        @page = Page.find(params[:id])
      end
      def update
        page = Page.find(params[:id])
        if page.update_attributes(page_params)
          render json: page, status: :ok
        else
          render json: {errors: page.errors.full_messages},
          status: :unprocessable_entity
        end
      end

      private
      def page_params
        params.require(:page).permit(:body)
      end
    end
  end
end
