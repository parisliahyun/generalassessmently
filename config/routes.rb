GeneralAssessmently::Application.routes.draw do
  root 'app#index'
  # resource :google_key, :only => :new
  resources :process
  
  resources :courses do
    resources :spreadsheets
  end
end
