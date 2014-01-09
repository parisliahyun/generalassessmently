GeneralAssessmently::Application.routes.draw do
  root 'app#index'
  get "about" => "welcome#about"
  resources :process
  
  resources :courses do
    resources :spreadsheets
  end
end
