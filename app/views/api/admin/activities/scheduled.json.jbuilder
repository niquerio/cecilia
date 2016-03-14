json.array! (@activities) do |act|  
  json.hours do
    json.array! (act.keys.sort) do |start|
      json.time start
      json.activities do
        json.array! (act[start]) do |activity|
          json.id activity.id
          json.title activity.title
          json.start_time activity.start_time
          json.duration activity.duration
          json.classroom_id activity.classroom.id
          json.classroom_name activity.classroom.name
        end
      end
    end
  end
end
