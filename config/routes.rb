GeneralAssessmently::Application.routes.draw do
  root 'app#index'
  resources :spreadsheets
  resources :process
end
