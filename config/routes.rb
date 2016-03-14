Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"

    namespace :api , defaults: { format: 'json' } do
      get 'events/:event_id/pages/:slug' => 'pages#show'
      get 'events/:event_id/activities' => 'activities#index'
      get 'events/:event_id/activities/schedule' => 'activities#schedule'
      get 'events/:event_id/staff' => 'staff#index'
      get 'events/:event_id/teachers' => 'teachers#index'
      get '/teachers' => 'teachers#index_all'
      get '/teachers/:username' => 'teachers#show'
      get '/activities' => 'activities#index_all'
      get '/activities/:id' => 'activities#show'
      resources :users, only: [:index]
      resources :activity_types, only: [:index]
      resources :activity_subtypes, only: [:index]
      resources :difficulties, only: [:index]
      namespace :admin, defaults: { format: 'json'} do
        get 'events/:event_id/classrooms' => 'classrooms#index'
        post 'classrooms' => 'classrooms#create'
        get 'classrooms/:id' => 'classrooms#show'
        put 'classrooms/:id' => 'classrooms#update'
        get 'events/:event_id/activities/unscheduled' => 'activities#unscheduled'
        get 'events/:event_id/activities/scheduled' => 'activities#scheduled'
        get 'events/:event_id/activities' => 'activities#index'
        resources :activities, only: [:create, :update, :destroy, :show]
        get 'events/:event_id/pages' => 'pages#index'
        resources :pages, only: [:update, :show]
      end
    end

    devise_for :users
    root to: 'home#index'
  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
