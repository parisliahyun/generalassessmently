GeneralAssessmently::Application.routes.draw do
  root 'app#index'
  resources :spreadsheets
  resource :google_key, :only => :new
  resources :process
end
