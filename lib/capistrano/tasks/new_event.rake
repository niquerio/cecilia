task :new_event do
  on roles(:app) do
    within release_path do
      execute :rake, 'new_event'
    end 
  end
  invoke 'puma:restart'
end
