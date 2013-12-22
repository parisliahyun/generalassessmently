GeneralAssessmently::Application.routes.draw do
  root 'app#index'
  resources :assessments, except: [:new, :edit]
end
